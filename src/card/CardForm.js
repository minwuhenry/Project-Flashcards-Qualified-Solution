import React from "react";

function CardForm(props) {
    return(
        <form name="editCard" onSubmit={props.handleSubmit}>
        <div>
          <label htmlFor="front">Front</label>
        </div>
        <div>
          <textarea className="form-control form-control-lg"
            id="front"
            type="text"
            name="front"
            onChange={props.changeHandler}
            value={props.card.front}
          />
        </div>
        <br />
        <div>
          <label htmlFor="back">Back</label>
        </div>
        <div>
          <textarea className="form-control form-control-lg"
            id="back"
            name="back"
            onChange={props.changeHandler}
            value={props.card.back}
          />
        </div>
        <br />
        <button
          type="button"
          className="btn btn-secondary mx-1"
          onClick={props.handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary mx-1">Submit</button>
      </form> 
    )
}
export default CardForm;
