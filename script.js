/*
 * @license
 * Getting Started with Web Serial Codelab (https://todo)
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
'use strict';

let port;
let reader;
let inputDone;
let outputDone;
let inputStream;
let outputStream;

var log = document.getElementById('log');
const butConnect = document.getElementById('butConnect');


document.addEventListener('DOMContentLoaded', () => {
  butConnect.addEventListener('click', clickConnect);

  // CODELAB: Add feature detection here.
  if ('serial' in navigator) {
    const notSupported = document.getElementById('notSupported');
    notSupported.classList.add('hidden');
  }

});

function sendCTRLD() {
  // restart the program
  writeToStream('\x04');
}

function sendCTRLC() {
  // stop the program
  writeToStream('\x03');
}

/**
 * @name connect
 * Opens a Web Serial connection to a micro:bit and sets up the input and
 * output stream.
 */
async function connect() {
  // CODELAB: Add code to request & open port here.
  // - Request a port and open a connection.
  port = await navigator.serial.requestPort();
  // - Wait for the port to open.
  await port.open({ baudrate: 115200 });

  // CODELAB: Add code setup the output stream here.
  const encoder = new TextEncoderStream();
  outputDone = encoder.readable.pipeTo(port.writable);
  outputStream = encoder.writable;

  // CODELAB: Add code to read the stream here.
  let decoder = new TextDecoderStream();
  inputDone = port.readable.pipeTo(decoder.writable);
  inputStream = decoder.readable;

  // clear current log file
  document.getElementById("log").innerHTML="";
  log.textContent = null;

  reader = inputStream.getReader();
  readLoop();

}


/**
 * @name disconnect
 * Closes the Web Serial connection.
 */
async function disconnect() {

  // CODELAB: Close the input stream (reader).
  if (reader) {
    await reader.cancel();
    await inputDone.catch(() => {});
    reader = null;
    inputDone = null;
  }

  // CODELAB: Close the output stream.
  if (outputStream) {
    await outputStream.getWriter().close();
    await outputDone;
    outputStream = null;
    outputDone = null;
  }

  // CODELAB: Close the port.
  await port.close();
  port = null;

}


/**
 * @name clickConnect
 * Click handler for the connect/disconnect button.
 */
async function clickConnect() {
  // CODELAB: Add disconnect code here.
  // stop running program
  sendCTRLC();
  
  if (port) {
    await disconnect();
    toggleUIConnected(false);
    return;
  }

  // CODELAB: Add connect code here.
  await connect();

  toggleUIConnected(true);
  console.log("Connected");


}


/**
 * @name readLoop
 * Reads data from the input stream and displays it on screen.
 */
async function readLoop() {
  // CODELAB: Add read loop here.
  while (true) {
    const { value, done } = await reader.read();
    if (value) {
      log.textContent += value + '\n';
      log.scrollTop = log.scrollHeight;
    }
    if (done) {
      console.log('[readLoop] DONE', done);
      reader.releaseLock();
      break;
    }
  }

}


/**
 * @name writeToStream
 * Gets a writer from the output stream and send the lines to the micro:bit.
 * @param  {...string} lines lines to send to the micro:bit
 */
function writeToStream(...lines) {
  // CODELAB: Write to output stream
  //console.log("Started to write")
  if (outputStream != null) {
    const writer = outputStream.getWriter();
    lines.forEach((line) => {
      //console.log('[SEND]', line);
      writer.write(line + '\n');
    });
    writer.releaseLock();
  }
  else {
    console.log("Can not write, no connection.");
  }

}


/**
 * @name LineBreakTransformer
 * TransformStream to parse the stream into lines.
 */
class LineBreakTransformer {
  constructor() {
    // A container for holding stream data until a new line.
    this.container = '';
  }

  transform(chunk, controller) {
    // CODELAB: Handle incoming chunk

  }

  flush(controller) {
    // CODELAB: Flush the stream.

  }
}

function toggleUIConnected(connected) {
  let lbl = 'Connect →';
  if (connected) {
    lbl = 'Disconnect ⏏';
  }
  butConnect.textContent = lbl;
}
