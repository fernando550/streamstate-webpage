import * as mainFunc from '../functions/functions';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: {
                isLoggedIn: false,
                profile: {
                    username: "default",
                    email: "default@default.com",
                    subscription: "basic"
                }
            },
            nuurd: {
                loading: false,
                fileUpload: null,
                userHandle: null,
                message: "initializing, please wait a up to a few minutes...",
                progress: "0%",
                sampling: "reverse",
                search: "friends",
                outputFileName: ""
            }
		},
		actions: {
			user_func: {
                login: () => {
                    console.log("Successfully logged in")
                    setStore({
                        ...getStore(),
                        user: { ...getStore().user, isLoggedIn: true }
                    })
                },
                logout: () => {
                    console.log("Successfully logged out")
                    setStore({
                        ...getStore(),
                        user: { ...getStore().user, isLoggedIn: false }
                    })
                } 
            },
            nuurd_func: {
                // initiate loading status so buttons are disabled and progress bar shows
                run: () => {
                    console.log("Initializing function, set loading to true")
                    setStore({
                        ...getStore(),
                        nuurd: { 
                            ...getStore().nuurd,
                            loading: true 
                        }
                    })
                },
                // change name for the automatic download .csv file
                setOutputFileName: (filename) => {
                    console.log("Output file name will be: ", filename)
                    setStore({
                        ...getStore(),
                        nuurd: { 
                            ...getStore().nuurd, 
                            outputFileName: filename 
                        }
                    })
                },
                // set progress bar and progess text
                setProgress: (progress) => {
                    setStore({
                        ...getStore(),
                        nuurd: { 
                            ...getStore().nuurd, 
                            progress: progress 
                        }
                    })
                },
                setMessage: (message) => {
                    setStore({
                        ...getStore(),
                        nuurd: { 
                            ...getStore().nuurd, 
                            message: message 
                        }
                    })
                },
                // changes input for either files or input field for user handle
                handleChange: (e) => {
                    e.preventDefault();
                    switch(e.target.id) {
                        case "fileUpload":
                            // console.log("A file was uploaded: ", e.target.files[0])
                            setStore({
                                ...getStore(),
                                nuurd: {...getStore().nuurd, fileUpload: e.target.files[0]}
                            });
                            break;
                        default:
                            // console.log("User handle input: ", e.target.value)
                            setStore({
                                ...getStore(),
                                nuurd: {...getStore().nuurd, userHandle: e.target.value }
                            })
                    }
                },
                // change the way we sample from our data
                onChangeSampling: async (e) => {
                    e.preventDefault();
                    console.log("Sampling selection changed to: ", e.target.id)
                    switch (e.target.id) {
                        case "chrono":
                            setStore({
                                ...getStore(),
                                nuurd: { ...getStore().nuurd, sampling: "chrono"}
                            })
                            break;
                        case "random":
                            setStore({
                                ...getStore(),
                                nuurd: { ...getStore().nuurd, sampling: "random"}
                            })
                            break;
                        default:
                            setStore({
                                ...getStore(),
                                nuurd: { ...getStore().nuurd, sampling: "reverse"}
                            })
                            break;
                    }
                },
                // change the network type we search (friends or followers)
                onChangeSearch: async (e) => {
                    e.preventDefault();
                    console.log("Search selection changed to: ", e.target.id)
                    switch (e.target.id) {
                        case "friends":
                            setStore({
                                ...getStore(),
                                nuurd: { ...getStore().nuurd, search: "friends"}
                            })
                            break;
                        default:
                            setStore({
                                ...getStore(),
                                nuurd: { ...getStore().nuurd, search: "followers"}
                            })
                            break;
                    }
                },
                // run the appropriate function based on view to run data mining
                handleSubmit: async (e) => {
                    e.preventDefault();
                    // e.persist();

                    console.log("Running ", e.target.id)

                    const { nuurd } = getStore();
                    const { nuurd_func } = getActions();

                    // call the run function to change 'loading' store variable to true
                    nuurd_func.run()

                    switch (e.target.id) {
                        case "form-tweet-history":
                            //runTweetHistory - processTweetHist
                            nuurd_func.setOutputFileName("tweet_history_" + nuurd.userHandle)
                            await mainFunc.processTweetHistory(nuurd, nuurd_func)
                            break;
                        case "form-network-file":
                            //runMutualNetworkFile - processFile
                            nuurd_func.setOutputFileName("soi_file_upload_" + nuurd.fileUpload.name)
                            await mainFunc.processMutualNetworkFile(nuurd, nuurd_func)
                            break;
                        case "form-network-user":
                            //runMutualNetworkUser - processUser
                            nuurd_func.setOutputFileName("soi_user_input_" + nuurd.userHandle)
                            await mainFunc.processMutualNetworkUser(nuurd, nuurd_func)
                            break;
                        case "form-network":
                            //runNetwork - getUserDataInput
                            nuurd_func.setOutputFileName("search_" + nuurd.search + "_" + nuurd.userHandle)
                            await mainFunc.processNetwork(nuurd, nuurd_func);
                            break;
                        default:
                            //run
                            break;
                    }

                    // reset store after running functions
                    nuurd_func.reset();
                },
                reset: () => {
                    setStore({
                        user: {
                            isLoggedIn: true,
                            profile: {
                                username: "default",
                                email: "default@default.com",
                                subscription: "basic"
                            }
                        },
                        nuurd: {
                            loading: false,
                            fileUpload: null,
                            userHandle: null,
                            message: "initializing, please wait a up to a few minutes...",
                            progress: "0%",
                            sampling: "reverse",
                            search: "friends",
                            outputFileName: ""
                        }
                    })
                }
            }
		}
	};
};

export default getState;
