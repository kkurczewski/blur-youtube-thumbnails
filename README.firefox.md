# Firefox vs Chrome

Firefox and Chrome are not compatible with each other regarding Manifest V3 and supported CSS keywords. Also respective stores expects different zip. Chrome Store expect whole [`src/`](https://github.com/kkurczewski/blur-youtube-thumbnails/tree/firefox/src) directory inside zip while Firefox Store expects flattened zip with content.

Due to this separate [`firefox`](https://github.com/kkurczewski/blur-youtube-thumbnails/tree/firefox) branch is used to develop extension for Firefox.

## Local deployment in Firefox

Firefox doesn't allow to install extension from package other than **temporarily**.

As per [docs](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/):

> To install an extension temporarily:
> * open Firefox
> * enter "about:debugging" in the URL bar
> * click "This Firefox"
> * click "Load Temporary Add-on"

Next go to [`about:addons`](about:addons) page in Firefox and configure url permissions and preferences.