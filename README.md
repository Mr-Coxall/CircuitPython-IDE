<!DOCTYPE html>
<html lang="en">
  <head>
    <title></title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta name="robots" content="noindex, nofollow">
    <meta name="googlebot" content="noindex, nofollow">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <script>
      // Redirect to HTTPS if HTTP is requested.
      if (window.location.protocol === 'http:') {
        window.location.href = 'https:' + window.location.href.substring(5);
      }
    </script>
    <link rel="stylesheet" href="./style.css">
    <script src="./script.js" defer></script>
    <script type="text/javascript" src="./split.min.js"></script>
    
    <style> 
      html,
      body {
        padding: 2px;
        height: 100%;
        background-color: #AAAAAA;
        box-sizing: border-box;
      }

      .ace_editor {
        position:relative; 
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: 1000px;
      }

      .split {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        overflow-y: auto;
        overflow-x: hidden;
      }

      .top {
        position:relative;
      }

      .bottom {
        position:relative;
      }

      .content {
        border: 1px solid #C0C0C0;
        box-shadow: inset 0 1px 2px #e4e4e4;
        background-color: #fff;
      }

      .gutter {
        background-color: transparent;
        background-repeat: no-repeat;
        background-position: 75%;
      }

      .gutter.gutter-horizontal {
        cursor: col-resize;
      }

      .gutter.gutter-vertical {
        cursor: row-resize;
      }

      .split.split-horizontal,

      .gutter.gutter-horizontal {
        height: 100%;
        float: left;
      }

      .button {
        background-color: #652F8F; /* Blinka purple */
        border: none;
        color: white;
        padding: 15px 15px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        border-radius: 8px;
      }

      .input-button {
        display: inline-block;
        background-color: #652F8F; 
        border: none;
        color: white;
        padding: 15px 15px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        border-radius: 8px;
      }

      .image-button {
        display: inline-block;
        background-color: #FFFFFF;
        border: none;
        color: white;
        padding: 7px 10px;
        text-decoration: none;
        display: inline-block;
        border-radius: 8px;
        float:left;
        margin-right:0.5em;
      }

      input[type="file"] {
        display: none;
      }
      
      .separator {
        content: '';
        display: inline-block;
        background: #888;
        margin: 0px 4px;
        height: 18px;
        width: 1px;
      }

      .repl-textarea {
        height: 100%;
        width: 100%;
        font-size: 18px;
      }
    </style>

    <script src="./src-min-noconflict/ace.js" type="text/javascript" charset="utf-8"></script>
    <script src="./src-min-noconflict/ext-language_tools.js"></script>

    <script type="text/javascript">
      window.onload=function(){
        Split(['#top', '#bottom'], {
          gutterSize: 10,
          sizes: [75, 25],
          direction: 'vertical',
        });
      }
    </script>
  </head>

  <body>
    <div id="notSupported">
      Sorry, <b>Web Serial</b> is not supported on this device, make sure you're 
      running Chrome 78 or later and have enabled the 
      <code>#enable-experimental-web-platform-features</code> flag in
      <code>chrome://flags</code>
    </div>
    <div>
      <button class="image-button" id="imageButton"><img src="./adafruit_blinka_computer.png"></button>
      <span class="separator"></span>
      <button class="button" id="butConnect">Connect →</button>
      <span class="separator"></span>
      <button class="button" onclick="newFile();">New +</button>
      <label class="input-button"><input accept=".py,
text/plain" type="file" id="fileToLoad" onclick="loadFile(event);"/>Load ⤒</label>
      <button class="button" onclick="saveFile();">Save ⤓</button>
      <span class="separator"></span>
      <button class="button" onclick="runFile();">Run ►</button>
      <button class="button" id="butClear" onclick="clearREPL();">Clear ⇪</button>
      <span class="separator"></span>
      <button class="button" onclick="fontPlus();">Font +</button>
      <button class="button" onclick="fontMinus();">Font -</button>
      <button class="button" onclick="changeTheme();">Theme ⇢</button>
      <button class="button" onclick="hiddenCharacters();">Hidden ⇵</button>
      <span class="separator"></span>
      <button class="button" onclick="about();">About ?</button>    
    </div>
    <div id="top" style="background-color:black" class="split content">
      <textarea id="editor"></textarea>
      <script>
        var fontSize = 24;
        var themes = ["ace/theme/eclipse", "ace/theme/github", "ace/theme/ambiance", "ace/theme/twilight"];
        var themeNumber = 0;
        var hidden = false;
        var currentFileName = null;

        var editor = ace.edit("editor");
        //editor.setTheme("ace/theme/twilight");
        editor.setTheme(themes[0]);
        editor.session.setMode("ace/mode/python");
        // use setOptions method to set several options at once
        editor.setOptions({
          autoScrollEditorIntoView: true,
          copyWithEmptySelection: true,
          tabSize: 4, // python standard, 4 spaces
          useSoftTabs: true, // python standard no tabs, spaces
          showInvisibles: hidden,
          fontSize: fontSize,
          hScrollBarAlwaysVisible: true,
          vScrollBarAlwaysVisible: true,
          newLineMode: "unix",
          enableLiveAutocompletion: true,
          enableSnippets: true,
        });

        function destroyClickedElement(event)
        {
          document.body.removeChild(event.target);
        }

        function newFile() {
          // new file, meaning save the current file and clear the IDE
          saveFile();
          // now clear the IDE
          editor.setValue("");
        }

        function loadFile() {
          // load file
        }

        function saveFile() {
          // save file, if currentFileName = null, ask for file name first
          if (currentFileName == null) {
            // get file name
          }

          // save file, to currentFileName
        }

        function runFile() {
          // run the current file, meaning save it!
          saveFile();
        }

        function clearREPL() {
          // clear REPL
          document.getElementById("log").innerHTML="";
          log.textContent = null;
        }

        function fontPlus() {
          // increase font size
          fontSize +=1;
          editor.setOptions({
            fontSize: fontSize,
          });
        }

        function fontMinus() {
          // decrease font size
          fontSize -=1;
          editor.setOptions({
            fontSize: fontSize,
          });
        }

        function changeTheme() {
          // change theme

          themeNumber +=1;
          if (themeNumber > themes.length - 1) {
            themeNumber = 0;
          }
          editor.setTheme(themes[themeNumber]);
        }

        function hiddenCharacters() {
          // hidden characters
          if (hidden == false) {
            hidden = true;
          }
          else if (hidden == true) {
            hidden = false;
          }

          editor.setOptions({
            showInvisibles: hidden,
          });
        }

        function about() {
          // about
          window.alert("CircuitPython Web IDE \n\nThis site is not only a text editor, it also gives you access to the REPL, so that you can see output and error messages from your CircuitPython hardware.");
        }
      </script>
    </div>
    <div id="bottom" class="split content">
      <textarea id="log" class="repl-textarea">
      </textarea>
    </div>
  </body>
</html>