import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { findByLabelText } from "@testing-library/react";
import marked, { parser } from "marked";

const defaultText = `# Live Markdown Previewer
 ## Markdown 
 
 Markdown is a popular [markup language](https://en.wikipedia.org/wiki/Markdown).  
 
 Simply display inline code: \`console.log(displaying inline code)\`

 or multi-line code blocks: 
 
 \`\`\`
 function square(a){  
	 (return a*a)  
	}	
\`\`\`

 **bold** or _italicize_

 > block quote

 Make lists 
  -bulleted
    -with indents

1. Or numbered
2. lists

You can also embed images:

![alt text](https://cdn4.iconfinder.com/data/icons/logos-and-brands-1/512/205_Markdown_logo_logos-512.png " Markdown logo")
 `;

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

	handleFileInputSubmit = event => {
		const file = this.fileInput.current.files[0];

		let fileReader = new FileReader();

		fileReader.onload = () => this.setState({ markdown: fileReader.result });

		fileReader.onerror = function() {
			alert("there was an error reading the file");
		};

		fileReader.readAsText(file);
	};

	render() {
		return (
			<div className="App">
				<div class ="title">Markdown Editor</div>
				<Button
					type="button"
					onClick={this.handleClearPreviewClick}
					className="clearButton"
				>Clear</Button>
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

				<Input ref={this.fileInput} onChange={this.handleFileInputSubmit} className ="fileInput"/>
				<div class ="footer">Markdown previewer created by awm</div>

			</div>
		);
	}
}

const Editor = props => {
	const { value, onChange, className, children } = props;
	return (
		<div className={className}>
			<div>{children}</div>
			<textarea value={value} onChange={onChange} ></textarea>
		</div>
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
		<label for="file"></label>
		<input type="file" id="file" ref={ref} onChange={props.onChange} />
	</div>
));

export default App;
