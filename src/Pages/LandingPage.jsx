import React from "react";
import Form from '../Components/Form';
import Table from '../Components/Table';


class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbStudent: [],
            dbFilter: []
        }
    }

    handleCallbackForm = (childDataForm) => {
        this.setState({ dbStudent: childDataForm })
    }

    handleCallbackSearch = (childDataForm) => {
        this.setState({ dbFilter: childDataForm })
    }

    render() {
        return (
            <div className="d-flex justify-content-center p-4">

                <div className="px-2 mx-2">
                    <Form
                        dbStudentForm={this.state.dbStudent}
                        parentCallbackForm={this.handleCallbackForm}
                    />
                </div>

                <div className="px-2 mx-2">
                    <Table
                        data={this.state.dbStudent}
                        dataFiltered={this.state.dbFilter}
                        parentCallbackForm={this.handleCallbackForm}
                        parentCallbackSearch={this.handleCallbackSearch}
                    />
                </div>

            </div>
        )
    }
}

export default LandingPage;


