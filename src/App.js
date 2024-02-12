import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from 'aws-amplify/api';
import {
  Button,
  Flex,
  Heading,
  Text,
  Image,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listNotes } from "./graphql/queries";
import { uploadData, getUrl, remove } from 'aws-amplify/storage';
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";

const client = generateClient();

const options = {
  method: 'GET',
  headers: {
      'X-RapidAPI-Key': 'fb4f76d242mshf600437f2e9d246p14393bjsn03a67b677806',
      'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com',
      'useQueryString': true,
      'Content-Type': "application/json",
      'Accept': "application/json"
  }
};


const JsonTable = ({ jsonObject }) => {
  if (!jsonObject || typeof jsonObject !== 'object') {
    // Handle cases where jsonObject is not provided or is not an object
    return null;
  }

  // Extract keys and values from the JSON object
  const keys = Object.keys(jsonObject);
  const values = Object.values(jsonObject);

  return (
    <div className="center spaced table-container">
    <table>
      <thead>
        <tr>
          <th>Author</th>
          <th>Quote</th>
          <th>Date/Time</th>
        </tr>
      </thead>
      <tbody>
        {keys.map((key, index) => (
          <tr key={index}>
            <td>{values[index]['author'].toString()}</td>
            <td>{values[index]['text'].toString()}</td>
            <td>{Date().toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

const App = ({ signOut }) => {
  const [notes, setNotes] = useState([]);
  const [quote, setQuote] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const getQuote = () => {
    setQuote([])
    setIsLoading(true)
    fetch('https://famous-quotes4.p.rapidapi.com/random',options)
      .then(function (response) {
        return response.json()
      })
      .then((data) => {
        setQuote(data)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  async function fetchNotes() {
    const apiData = await client.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const url = await getUrl({key: note.id});
          note.image = url;
        }
        return note;
      })
    );
    setNotes(notesFromAPI);
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      image: image ? image.name : null,
    };
    const result=await client.graphql({
      query: createNoteMutation,
      variables: { input: data },
    });
    if (!!data.image) await uploadData({key:result.data.createNote.id, data:image});
    fetchNotes();
    event.target.reset();
  } 
  
  async function deleteNote({ id, name }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await remove({key:id});
    await client.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }

  return (
    <View className="App">
      <Heading level={1}>My Notes App</Heading>
      <View as="form" margin="3rem 0" onSubmit={createNote}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="Note Name"
            label="Note Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Note Description22"
            label="Note Description"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create Note
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Notes</Heading>
      <View margin="3rem 0">
      {notes.map((note) => (
        <Flex
          key={note.id || note.name}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Text as="strong" fontWeight={700}>
            {note.name}
          </Text>
          <Text as="span">{note.description}</Text>
          {note.image && (
            <Image
              src={note.image}
              alt={`visual aid for ${notes.name}`}
              style={{ width: 400 }}
            />
          )}
          <Button variation="link" onClick={() => deleteNote(note)}>
            Delete note
          </Button>
        </Flex>
      ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
       
      <div>
        <h1>JSON Table</h1>
        <Button onClick={() => getQuote()}>Get Quote
        </Button>
        <JsonTable jsonObject={quote} />
      </div>

    </View>
  );
};

export default withAuthenticator(App);