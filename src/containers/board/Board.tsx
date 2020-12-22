import React, { ReactNode } from 'react';
import { connect } from 'react-redux'
import { BoardReduxStore, TechFields } from './store/Board.state';
import * as fromActions from './store/Board.actions';
import { KeyValue } from '../../system/types/KeyValue';
import { Task } from './models/Task';
import { Status } from './models/Status';
import { BoardForm } from './components/BoardForm';
import { DragDropContext, Draggable, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { SetTaskOrderPayload, SetTaskStatusPayload } from './store/Board.types';
import TaskCard from './components/TaskCard';


/**
 * Props model
 */
type Props = {
	/** Technical fields */
	techFields: TechFields;
	/** Task list */
	task: KeyValue<Task>;
}

/**
 * State props from store
 */
const mapStateToProps = (state: BoardReduxStore): Props => {
	if (state && state.board) {
		const { techFields, task } = state.board;
		return { techFields, task };
	}
}

/**
 * Dispatch props model
 */
type DispatchProps = {
	/** Set form visibility action */
	setFormVisibility: (visible: boolean) => ReturnType<typeof fromActions.Actions.setFormVisibility>
	/** Set task order action */
	setTaskOrder: (payload: SetTaskOrderPayload) => ReturnType<typeof fromActions.Actions.setTaskOrder>
	/** Set task status action */
	setTaskStatus: (payload: SetTaskStatusPayload) => ReturnType<typeof fromActions.Actions.setTaskStatus>
	/** Delete task action */
	deleteTask: (id: string) => ReturnType<typeof fromActions.Actions.deleteTask>
}

/**
 * Dispatch props
 */
const mapDispatchToProps: DispatchProps = {
	setFormVisibility: fromActions.Actions.setFormVisibility,
	setTaskOrder: fromActions.Actions.setTaskOrder,
	setTaskStatus: fromActions.Actions.setTaskStatus,
	deleteTask: fromActions.Actions.deleteTask
}

/**
 * Board combined props
 */
export type CombinedProps = Props & DispatchProps

/**
 * Board container
 */
class Board extends React.Component<CombinedProps> {

	/**
	 * Handle on drag end
	 */
	onDragEnd = (result: DropResult, provided: ResponderProvided) => {
		const { destination, draggableId, source } = result;
		if (destination != null) {
			if (source.droppableId === destination.droppableId && source.index !== destination.index) {
				const payload: SetTaskOrderPayload = {
					sourceIndex: source.index,
					destinationIndex: destination.index,
					taskId: draggableId
				}
				this.props.setTaskOrder(payload);
			}
			else if (source.droppableId !== destination.droppableId) {
				const payload: SetTaskStatusPayload = {
					sourceIndex: source.index,
					destinationIndex: destination.index,
					taskId: draggableId,
					newStatus: destination.droppableId as Status
				}
				this.props.setTaskStatus(payload);
			}
		}
	}

	/**
	 * Prepare column header
	 */
	getColumnHeader(status: Status): ReactNode {
		let containerCss: string = null;
		switch (status) {
			case 'Todo':
				containerCss = "bg-info";
				break;
			case 'InProgress':
				containerCss = "bg-warning";
				break;
			case 'Completed':
				containerCss = "bg-success";
				break;
		}

		return <>
			<div className={containerCss + " m-1 mb-2 p-1 border-radius"}>
				<h5 className="text-center">{status}</h5>
			</div>
		</>
	}

	/**
	 * Prepare column content
	 */
	getColumnContent(status: Status): ReactNode {
		return <>
			{this.getColumnHeader(status)}
			<Droppable droppableId={status}>
				{(provided) => (
					<div className="row m-1 drag-drop-area border-radius" {...provided.droppableProps} ref={provided.innerRef}>
						{
							this.props.techFields.taskOrder[status].map((el, index) => {
								const task: Task = this.props.task[el];
								return (
									<Draggable key={el} index={index} draggableId={el}>
										{(provided) => <TaskCard
											task={task}
											provided={provided}
											deleteTask={this.props.deleteTask}
										/>}
									</Draggable>
								)
							})
						}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</>
	}

	/**
	 * Renders Board
	 */
	render(): ReactNode {
		return <DragDropContext onDragEnd={this.onDragEnd}>
			<div className="container pt-2">
				<div className="row">
					<div className="col-4">
						{this.getColumnContent("Todo")}
						{
							this.props.techFields.adding === true
								? <BoardForm />
								: <button
									className="btn btn-dark mt-3"
									onClick={() => this.props.setFormVisibility(true)}
								>
									Click here to add new task
								</button>
						}
					</div>
					<div className="col-4">
						{this.getColumnContent("InProgress")}
					</div>
					<div className="col-4">
						{this.getColumnContent("Completed")}
					</div>
				</div>
			</div>
		</DragDropContext >
	}
}


const board = connect(mapStateToProps, mapDispatchToProps)(Board);

export {
	board as Board
};
