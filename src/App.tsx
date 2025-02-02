

const App = () => {
  const openOptionsPage = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      // Fallback method
      window.open(chrome.runtime.getURL("options.html"));
    }
  };



  return (
    <div className="p-4 bg-gray-100 w-60">
      <h1 className="text-lg font-bold">Popup Page</h1>
      <p>This is the popup window.</p>
      <button
        onClick={openOptionsPage}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Open Options
      </button>
    </div>
  );
};

export default App;
