import React from "react";

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIdx: null
        }

    }

    printData = (db) => {
        if (this.props.dataFiltered.length > 0) {
            db = this.props.dataFiltered
        } else {
            db = this.props.data
        }
        return db.map((value, index) => {
            if (this.state.selectedIdx == index) {
                return (
                    <tr key={value.id}>
                        <td>{index + 1}</td>
                        <td>
                            <input type="text" className="form-control" ref="newName" defaultValue={value.name}></input>
                        </td>
                        <td>
                            <select ref="newClass" name="FormClass" className="form-select" defaultValue={value.class}>
                                <option value="null">Choose Class</option>
                                <option value="JC-Full Stack">JC-Full Stack</option>
                                <option value="JC-Data Science">JC-Data Science</option>
                                <option value="JC-UI/UX Design">JC-UI/UX Design</option>
                            </select>
                        </td>
                        <td>
                            <select ref="newTime" name="FormTime" className="form-select" defaultValue={value.time}>
                                <option value="null">Choose Time</option>
                                <option value="After-hour">After-hour</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Livestream">Livestream</option>
                            </select>
                        </td>
                        <td>
                            <input type="text" className="form-control" ref="newJob" defaultValue={value.job}></input>
                        </td>
                        <td>
                            <input type="text" className="form-control" ref="newNote" defaultValue={value.note}></input>
                        </td>
                        <td>
                            <button type="button" className="btn btn-success" onClick={() => this.btnSave(value.id)}>Save</button>
                            <button type="button" className="btn btn-danger" onClick={() => this.btnCancel(value.id)}>Cancel</button>
                        </td>
                    </tr>
                )
            } else {
                return (
                    <tr key={value.id}>
                        <td>{index + 1}</td>
                        <td>{value.name}</td>
                        <td>{value.class}</td>
                        <td>{value.time}</td>
                        <td>{value.job}</td>
                        <td>{value.note}</td>
                        <td>
                            <button type="button" className="btn btn-outline-warning" onClick={() => this.btnEdit(value.id)}>Edit</button>
                            <button type="button" className="btn btn-danger" onClick={() => this.btnDelete(value.id)}>Delete</button>
                        </td>
                    </tr>
                )
            }
        })
    }

    btnDelete = (dataId) => {
        console.log("cek delete btn", this.btnDelete)
        console.log("cek dataId", dataId)

        let temp = [...this.props.data]
        let filterDeleted = temp.filter(value => value.id != dataId)
        console.log("cek filterDeleted", filterDeleted)

        this.props.parentCallbackForm(filterDeleted)
    }

    btnEdit = (dataId) => {
        console.log("cek dataId", dataId)
        let idxDbStudent = this.props.data.findIndex(value => value.id == dataId)
        this.setState({ selectedIdx: idxDbStudent })
    }

    btnSave = (dataId) => {
        console.log("cek save btn", this.btnSave)
        console.log("Cek new value", this.refs.newName.value, this.refs.newClass.value, this.refs.newTime.value, this.refs.newJob.value, this.refs.newNote.value)

        let temp = [...this.props.data]
        let idxTemp = temp.findIndex(value => value.id == dataId)
        temp[idxTemp].name = this.refs.newName.value
        temp[idxTemp].class = this.refs.newClass.value
        temp[idxTemp].time = this.refs.newTime.value
        temp[idxTemp].job = this.refs.newJob.value
        temp[idxTemp].note = this.refs.newNote.value

        this.props.parentCallbackForm(temp)

        this.setState({
            selectedIdx: null
        })
    }

    btnCancel = (dataId) => {
        console.log("cek cancel btn", this.btnCancel)

        this.setState({
            selectedIdx: null
        })
    }

    btnSearch = () => {
        console.log("cek isian filter", this.refs.nameFilter.value, this.refs.classFilter.value)

        let nameFilter = this.refs.nameFilter.value
        let classFilter = this.refs.classFilter.value
        let temp = [...this.props.data]
        let filteredData = []

        if (nameFilter || classFilter) {
            if (nameFilter) {
                filteredData = temp.filter(value => value.name.toLowerCase().includes(nameFilter.toLowerCase()))
            } else {
                filteredData = temp.filter(value => value.class == classFilter)
            }
        }

        this.props.parentCallbackSearch(filteredData)

    }

    btnReset = () => {
        console.log("cek reset btn", this.btnReset)

        let tempFilter = [...this.props.dataFiltered]
        tempFilter = []
        this.props.parentCallbackSearch(tempFilter)

        let tempdbStudent = [...this.props.data]
        this.props.parentCallbackForm(tempdbStudent)

        this.refs.nameFilter.value = ""
        this.refs.classFilter.value = "null"

    }

    render() {
        return (
            <div>

                <div className="container">
                    <h5>Filter by</h5>

                    <div className="d-flex py-3 align-items-center">

                        <p className="form-label mx-2">Name</p>
                        <input type="text" className="form-control" ref="nameFilter" defaultValue=""></input>

                        <p className="form-label mx-2">Class</p>
                        <select ref="classFilter" name="FormClass" className="form-select" defaultValue="null">
                            <option value="null">Choose Class</option>
                            <option value="JC-Full Stack">JC-Full Stack</option>
                            <option value="JC-Data Science">JC-Data Science</option>
                            <option value="JC-UI/UX Design">JC-UI/UX Design</option>
                        </select>

                    </div>

                    <div className="py-1">
                        <button type="button" className="btn btn-info w-100" onClick={this.btnSearch}>Search</button>
                    </div>

                    <div className="py-1">
                        <button type="button" className="btn btn-secondary w-100" onClick={this.btnReset}>Reset</button>
                    </div>

                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Time</th>
                            <th>Job</th>
                            <th>Note</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printData()}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default Table;
