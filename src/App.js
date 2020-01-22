import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { findByLabelText } from "@testing-library/react";
import marked, { parser } from "marked";

const defaultText = `## Markdown

[Markdown](https://en.wikipedia.org/wiki/Markdown) is a markup language that emphasizes _simplicity_ and _readability_.

> Markdown strives to be readable even as it marks up text.
> It does so by ditching tags for less intrusive markup syntax.
> This page is a live playground to convert your markdown into html.

## How to Use this Markdown Previewer?
- Write markdown in the editor and see the html rendered live in the previewer.
- Have a markdown file you want to preview? Click 'upload file' to upload its contents to the editor.
- You can also view the source html by clicking on the dropdown menu above the previewer.

## Some Markdown Features:

1. Display Code

	* You can seamlessly \`console.log('display inline code')\`
	  or multi-line code blocks: 
  \`\`\`
  		function square(a) {  

	  		(return a*a) 

	 		}	
 \`\`\`

2. Make lists composed of:

	- bullets
		- indents
	1. or numbers

3. You can also embed images:

 	![alt text](https://cdn4.iconfinder.com/data/icons/logos-and-brands-1/512/205_Markdown_logo_logos-512.png " Markdown logo")
 
_default text in this editor based on [Marked Live Demo](https://marked.js.org/demo/)_`;


class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			markdown: defaultText,
			displayPreview: "live"
		};

		this.fileInput = React.createRef();
	}

	handleEditorChange = event => {
		this.setState({ markdown: event.target.value });
	};

	handlePreviewDropDownChange = event => {
		this.setState({ displayPreview: event.target.value });
		console.log("work");
	};

	handleClearPreviewClick = event => {
		this.setState({ markdown: "" });
	};

	handleFileInputSubmit = (event) => {
		/*event handler for  <input type = "file">, sets state of markdown with value of readFile()*/

		const file = this.fileInput.current.files[0];
		this.readFile(file).then( (value) => {

			this.setState({markdown: value})
		})
		
		
		

		
}

	 readFile = (fileList)=>  {
		 return new Promise( (resolve, reject) => {
		let fileReader = new FileReader();
		console.log("ok")

		fileReader.onload = () => resolve(fileReader.result);
			
			
		
		fileReader.onerror = function() {
			reject("there was an error reading the file");
		};

		fileReader.readAsText(fileList);

	 }) } 

		
	

	render() {
		return (
			<div className="App">
				<div className = "container-header-editor">
				<Header className = "title-editor">Markdown Editor</Header>
				<Button
					type="button"
					onClick={this.handleClearPreviewClick}
					className="clearButton"
				>Clear</Button>
				<Input ref={this.fileInput} onChange={this.handleFileInputSubmit} className ="fileInput">Upload File</Input>
				</div>
				<Header className = "title-preview">Markdown Previewer</Header>
				<PreviewDropDown
					value={this.state.displayPreview}
					onChange={this.handlePreviewDropDownChange}
					type="select"
					className="previewDropdown"
				></PreviewDropDown>
				<Editor
					value={this.state.markdown}
					onChange={this.handleEditorChange}
					className = "editor"
				>
				</Editor>
				<Preview
					displayPreview={this.state.displayPreview}
					parsedHTML={this.state.markdown}
					className="preview"
				/>

				
				<div class ="footer">Markdown previewer created by awm</div>

			</div>
		);
	}
}

const Header = props =>{
	const {className, children} = props;
	return(
	<div className = {className}>{children}</div>
	)}

const Editor = props => {
	const { value, onChange, className, children } = props;
	return (
		
			<textarea value={value} onChange={onChange} className= {className} ></textarea>
		
	);
};

const PreviewDropDown = props => {
	const { value, onChange, className } = props;
	return (
		<form className={className}>
			<select value={value} onChange={onChange} >
				<option value="live">Live Preview</option>
				<option value="html">HTML Source</option>
			</select>
		</form>
	);
};

const Preview = props => {
	const { displayPreview, parsedHTML, className } = props;
	return (
		<div className={className}>
			{displayPreview == "live" ? (
				<div 
					dangerouslySetInnerHTML={{
						__html: marked(parsedHTML, { breaks: "true" })
					}}
				/>
			) : (
				<div >{marked(parsedHTML, { breaks: "true" })}</div>
			)}
		</div>
	);
};

const Button = props => {
	const { type, onClick, className, children } = props;
	return (
		<button type={type} onClick={onClick} className={className}>
			{children}
		</button>
	);
};

const Input = React.forwardRef((props, ref) => (
	<div className = {props.className}>
		<label for="file">{props.children}</label>
		<input type="file" id="file" ref={ref} onChange={props.onChange} />
	</div>
));

export default App;
