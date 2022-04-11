import React from "react";

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            idStudent: 0,
            FormName: "",
            FormClass: "null",
            FormTime: "null",
            FormJob: "",
            FormNote: ""
        }

    }

    updateFormName = (event) => {
        // console.log("name",event.target.value)
        this.setState({FormName: event.target.value})
    }

    handleClass = (event) => {
        // console.log("class",event.target.value)
        this.setState({FormClass: event.target.value})
    }
    
    handleTime = (event) => {
        // console.log("time",event.target.value)
        this.setState({FormTime: event.target.value})
    }

    updateFormJob = (event) => {
        // console.log("job",event.target.value)
        this.setState({FormJob: event.target.value})
    }

    updateFormNote = (event) => {
        // console.log("note",event.target.value)
        this.setState({FormNote: event.target.value})
    }

    btnSubmit=()=>{
        let temp = this.state.idStudent
        temp++
        this.setState({idStudent: temp})

        let tempDb = [...this.props.dbStudentForm];
        tempDb.push(
            {
                id: temp,
                name: this.state.FormName,
                class: this.state.FormClass,
                time: this.state.FormTime,
                job: this.state.FormJob,
                note: this.state.FormNote,
                status: "normal"
            }
        )

        this.props.parentCallbackForm(tempDb);

        this.setState({
            FormName: "",
            FormClass: "null",
            FormTime: "null",
            FormJob: "",
            FormNote: ""
        })
    }

    render(){

        return (
            <div>
                <h5>Data Form Input</h5>
                <form>

                <div className="mb-3">
                <p className="form-label">Name</p>
                <input type="text" className="form-control" ref="name" value={this.state.FormName} onChange={this.updateFormName}></input>
                </div>

                <div className="mb-3">
                <p className="form-label">Class</p>
                <select ref="class" name="FormClass" className="form-select" onChange={this.handleClass} value={this.state.FormClass}>
                <option value="null">Choose Class</option>
                <option value="JC-Full Stack">JC-Full Stack</option>
                <option value="JC-Data Science">JC-Data Science</option>
                <option value="JC-UI/UX Design">JC-UI/UX Design</option>
                </select>
                </div>

                <div className="mb-3">
                <p className="form-label">Time</p>
                <select ref="time" name="FormTime" className="form-select" onChange={this.handleTime} value={this.state.FormTime}>
                <option value="null">Choose Time</option>
                <option value="After-hour">After-hour</option>
                <option value="Full-time">Full-time</option>
                <option value="Livestream">Livestream</option>
                </select>
                </div>

                <div className="mb-3">
                <p className="form-label">Job</p>
                <input type="text" className="form-control" ref="job" value={this.state.FormJob} onChange={this.updateFormJob}></input>
                </div>

                <div className="mb-3">
                <p className="form-label">Note</p>
                <input type="text" className="form-control" ref="note" value={this.state.FormNote} onChange={this.updateFormNote}></input>
                </div>

                </form>

                <div>
                    <button type="button" className="btn btn-primary w-100" onClick={this.btnSubmit}>Submit</button>
                </div>

            </div>
        )
        
    }
}

export default Form;