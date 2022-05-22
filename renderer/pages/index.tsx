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
            <h1 style={{ color: "red" }}>候補者情報入力フォーム</h1>
            <hr />
            <div>
              <div>氏名</div>
              <div>
                <input type="text" placeholder="code4biz" />
                <input type="text" placeholder="太郎" />
              </div>
            </div>
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
              <div>面接日時</div>
              <input type="date" name="example" required />
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
            <hr />
            <button onClick={() => setIsFormDone((isForm) => !isForm)}>
              登録する
            </button>
          </div>
        </>
      )}
      <button onClick={() => setIsFormDone((isForm) => !isForm)}>
        Say hi to electron
      </button>
    </Layout>
  );
};

export default IndexPage;
