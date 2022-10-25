const credential = new AzureKeyCredential("<<your key goes here>>");
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  AzureKeyCredential,
  DocumentAnalysisClient,
} from "@azure/ai-form-recognizer";
import ReactTable from "react-table";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function VerifyDocument() {
  const endpoint = "<<your end point goes here>>";
  const client = new DocumentAnalysisClient(endpoint, credential);

  const [image, setImage] = useState(null);
  const [fields, setFields] = useState();
  const [response, setResponse] = useState();
  const [createObjectURL, setCreateObjectURL] = useState();
  const [modelId, setModelId] = useState("");

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async () => {
    const modelId = "your model goes here";

    setResponse({});
    const poller = await client.beginAnalyzeDocument(modelId, image);

    const {
      documents: [document],
    } = await poller.pollUntilDone();

    if (!document) {
      throw new Error("Expected at least one document in the result.");
    }

    console.log(
      "Extracted document:",
      document.docType,
      `(confidence: ${document.confidence || "<undefined>"})`
    );

    setFields(document.fields);
    setResponse(document);
    console.log(document);
    console.log("Fields:", document.fields);
  };

  return (
    <div className="container container-fluid mt-4 styles.container">
      <div className="card mt-10 styles.main">
        <img className="image rounded float-left mt-2" src={createObjectURL} />

        <h4 className="h4 mt-2">Select Image</h4>
        <input type="file" name="myImage" onChange={uploadToClient} />

        <button
          className="btn btn-primary mt-4"
          type="submit"
          onClick={uploadToServer}
        >
          Extract Information
        </button>
      </div>

      <div className="mt-4 text h2 text-primary">Extracted Information</div>

      {response ? (
        <div>
          <pre>
            <code>{JSON.stringify(response, null, 4)}</code>
          </pre>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
