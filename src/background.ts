
// enables the side panel to open when the extension icon is clicked
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// listens for the keyboard shortcut to toggle the side panel using "Alt+Shift+V"
chrome.commands.onCommand.addListener((command) => {
	if (command === "toggle-side-panel") {
 	    chrome.windows.getCurrent(async (window) => {
        	if (window?.id) {
            	await chrome.sidePanel.open({ windowId: window.id });
        	}
    	});
	}
});