import React, { Component, ReactNode } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { Task } from '../models/Task';
import * as fromActions from '../store/Board.actions';

/** Component props */
type Props = {
	/** Task item */
	task: Task;
	/** Provided draggable */
	provided: DraggableProvided;
	/** Remove item action */
	deleteTask: (id: string) => ReturnType<typeof fromActions.Actions.deleteTask>
}

/**
 * Task carc component
 */
class TaskCard extends Component<Props> {

	/**
	 * Renders TaskCard
	 */
	render(): ReactNode {
		const { provided, task: { id, title, description } } = this.props;
		return (
			<div
				className="col-12 mb-1 mt-1 border-radius"
				ref={provided.innerRef}
				{...provided.draggableProps}
				{...provided.dragHandleProps}
			>
				<div className="card task-card">
					<div className="text-right mr-2">
						<button
							className="btn btn-dark mt-3"
							onClick={() => this.props.deleteTask(id)}
						>
							X
						</button>
					</div>
					<div className="card-body">
						{title && <h5 className="card-title">{title}</h5>}
						{description && <p className="card-text">{description}</p>}

					</div>
				</div>
			</div>
		)
	}
}

export default TaskCard;
