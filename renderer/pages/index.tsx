import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const IndexPage = () => {
  const [isFormDone, setIsFormDone] = useState(false);
  useEffect(() => {
    const handleMessage = (_event, args) => alert(args);

    // add a listener to 'message' channel
    global.ipcRenderer.addListener("message", handleMessage);

    return () => {
      global.ipcRenderer.removeListener("message", handleMessage);
    };
  }, []);

  return (
    <Layout>
      {!isFormDone ? (
        <>not dane</>
      ) : (
        <>
          <div>
            <div>氏名</div>
            <div>
              <input type="text" placeholder="code4biz" />
              <input type="text" placeholder="太郎" />
            </div>
          </div>
          <div>
            <div>面接フェーズ</div>
            <div>
              <div>
                <input
                  type="radio"
                  id="huey"
                  name="drone"
                  value="huey"
                  checked
                />
                <label>Huey</label>
              </div>

              <div>
                <input type="radio" id="dewey" name="drone" value="dewey" />
                <label>Dewey</label>
              </div>

              <div>
                <input type="radio" id="louie" name="drone" value="louie" />
                <label>Louie</label>
              </div>
            </div>
            <div>
              <div>面接メモ</div>
              <textarea
                name="memo"
                cols={30}
                rows={10}
                placeholder="type here..."
              />
            </div>
          </div>
          <div>
            <div>面接日時</div>
            <input type="date" name="example" required />
          </div>
        </>
      )}
      <h1 style={{ color: "red" }}>Hello Next.js & Electron 👋</h1>
      <button onClick={() => setIsFormDone((isForm) => !isForm)}>
        Say hi to electron
      </button>
    </Layout>
  );
};

export default IndexPage;
