import produce from 'immer';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TaskBase } from '../models/Task';
import * as  fromActions from '../store/Board.actions'

/**
 * Dispatch props model
 */
type DispatchProps = {
	/** Add task action */
	addTask: (task: TaskBase) => ReturnType<typeof fromActions.Actions.addTask>
	/** Set form visibility action */
	setFormVisibility: (visible: boolean) => ReturnType<typeof fromActions.Actions.setFormVisibility>
}

/**
 * Dispatch props
 */
const mapDispatchToProps: DispatchProps = {
	addTask: fromActions.Actions.addTask,
	setFormVisibility: fromActions.Actions.setFormVisibility,
}

/**
 * Board from combined props
 */
export type CombinedProps = DispatchProps

type State = {
	/** Task title */
	title: string;
	/** Task description */
	description: string;
}

/**
 * Board form component class
 */
class BoardForm extends Component<CombinedProps, State> {
	/** Title input id */
	readonly titleInputId: string = "title";
	/** Description input id */
	readonly descriptionInputId: string = "description";

	state: State = {
		title: "",
		description: ""
	}

	/**
	 * Handle input value change
	 */
	handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const id: string = event.target.id;
		const value: string = event.target.value;

		this.setState(
			produce((draft: State) => {
				if ((draft as Object).hasOwnProperty(id)) {
					draft[id] = value
				}
			})
		);
	}

	/**
	 * On submit click
	 */
	handleSubmitClick = () => {
		const { description, title } = this.state;
		this.props.addTask({ description, title })
	}

	/**
	 * Renders BoardForm component
	 */
	render() {
		return (
			<div className="row bg-light m-1 mt-3 border-radius">
				<div className="col-12">
					<h5 className="text-center p-1">Adding new task</h5>
					<hr></hr>
				</div>
				<div className="col-12 form-group">
					<label htmlFor={this.titleInputId}>
						Title:
						</label>
					<input
						id={this.titleInputId}
						className="form-control"
						type="text"
						value={this.state.title}
						onChange={this.handleChange}
					/>
				</div>
				<div className="col-12 form-group">
					<label htmlFor={this.descriptionInputId}>
						Description:
						</label>
					<input
						id={this.descriptionInputId}
						className="form-control"
						type="text"
						value={this.state.description}
						onChange={this.handleChange}
					/>
				</div>
				<div className="col-12">
					<button
						className="btn btn-secondary mb-1 w-25"
						onClick={() => this.props.setFormVisibility(false)}
					>
						Cancel
				</button>
					<button
						className="btn btn-dark mb-1 ml-1 w-50"
						onClick={this.handleSubmitClick}
					>
						Submit
				</button>
				</div>
			</div>
		);
	}
}


const board = connect(null, mapDispatchToProps)(BoardForm);
export {
	board as BoardForm
};
