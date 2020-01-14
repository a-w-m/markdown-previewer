import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { findByLabelText } from "@testing-library/react";
import marked, { parser } from "marked";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			markdown: "",
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
		const helloWorld = "hello world, we're creating a Markdown Previewer";
		return (
			<div className="App">
				{helloWorld}

				<Editor value={this.state.markdown} onChange={this.handleEditorChange}>
					Editor
				</Editor>
				<PreviewDropDown
					value={this.state.displayPreview}
					onChange={this.handlePreviewDropDownChange}
					type="select"
				></PreviewDropDown>

				<Preview
					displayPreview={this.state.displayPreview}
					parsedHTML={this.state.markdown}
				/>

				<Button type="button" onClick={this.handleClearPreviewClick}>
					Clear Preview
				</Button>
				<Input ref={this.fileInput} onChange={this.handleFileInputSubmit} />
			</div>
		);
	}
}

const Editor = props => {
	const { value, onChange, children } = props;
	return (
		<div>
			<div>{children}</div>
			<textarea value={value} onChange={onChange}></textarea>
		</div>
	);
};

const PreviewDropDown = props => {
	const { value, onChange } = props;
	return (
		<form>
			<select value={value} onChange={onChange}>
				<option value="live">Live Preview</option>
				<option value="html">HTML Source</option>
			</select>
		</form>
	);
};

const Preview = props => {
	const { displayPreview, parsedHTML } = props;
	return (
		<div>
			{displayPreview == "live" ? (
				<div
					dangerouslySetInnerHTML={{
						__html: marked(parsedHTML, { breaks: "true" })
					}}
				/>
			) : (
				<div>{marked(parsedHTML, { breaks: "true" })}</div>
			)}
		</div>
	);
};

const Button = props => {
	const { type, onClick, children } = props;
	return (
		<button type={type} onClick={onClick}>
			{children}
		</button>
	);
};

const Input = React.forwardRef((props, ref) => (
	<div>
		<label for="file"></label>
		<input type="file" id="file" ref={ref} onChange={props.onChange} />
	</div>
));

export default App;
