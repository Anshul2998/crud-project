import React, { useState } from 'react'

export const Signup = () => {
    const [inputvalues, setInputvalues] = useState({
        nm: "",
        eid: "",
        pass: ""
    });
    const [userdata, setUserdata] = useState([]);
    const inputhandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputvalues({ ...inputvalues, [name]: value });
    }
    const formsubmit = (event) => {
        event.preventDefault();
        // console.log(inputvalues);
        fetch("http://localhost:4000/adduser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputvalues)
        }).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data.success);
        })
    }
    const showdata = async () => {
        let result = await fetch("http://localhost:4000/show");
        let data = await result.json();
        setUserdata(data);
    }
    // delete data 
    const deletedata = async (id) => {
        //console.log(id);
        let res = await fetch(`http://localhost:4000/delete/${id}`);
        let data = await res.json();
        console.log(data.success);
        showdata();
    };
    const [editinputdata, setEditinputdata] = useState({
        name: "",
        email: "",
        password: ""
    });
    const editdata = async (uid) => {
        let res = await fetch(`http://localhost:4000/edit/${uid}`);
        let data = await res.json();
        console.log(data);
        setEditinputdata(data);
    };

    const editinputHandler = (event) => {
        const uvalue = event.target.value;
        const uname = event.target.name;
        setEditinputdata({ ...editinputdata, [uname]: uvalue });
    }
    const formsubmited = (event) => {
        event.preventDefault();
        //alert("Testing");
        //console.log(inputdata);
        fetch("http://localhost:4000/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editinputdata)
        }).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data.success);
        })
    }
    return (
        <>
            <div className="container">
                <form method='post' onSubmit={formsubmit}>
                    <div className="form-group">
                        <label htmlFor="pwd">Enter Name:</label>
                        <input type="text" className="form-control" name="nm" value={inputvalues.nm} placeholder="Enter Name" id="name" onChange={inputhandler} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input type="email" className="form-control" name="eid" value={inputvalues.eid} placeholder="Enter email" id="email" onChange={inputhandler} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input type="password" className="form-control" name="pass" value={inputvalues.pass} placeholder="Enter password" id="pwd" onChange={inputhandler} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <button className='btn btn-info' onClick={showdata}> Show Data</button>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Object ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userdata.map((items, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{items._id}</td>
                                        <td>{items.name}</td>
                                        <td>{items.email}</td>
                                        <td>{items.password}</td>
                                        <td>
                                            <button className='btn btn-danger' onClick={() => {
                                                deletedata(items._id)
                                            }}>Delete</button>
                                            <button className='btn btn-info ml-2' onClick={() => {
                                                editdata(items._id)
                                            }} data-toggle="modal" data-target="#myModal">Edit</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
                <div className="modal" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Modal Heading</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body">
                                <form method='post' onSubmit={formsubmited}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" name="nm" className="form-control" placeholder="Enter Name" id="name" value={editinputdata.nm} onChange={editinputHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email address:</label>
                                        <input type="email" name='eid' className="form-control" onChange={editinputHandler} value={editinputdata.eid} placeholder="Enter email" id="email" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pwd">Password:</label>
                                        <input type="password" name="pass" className="form-control" value={editinputdata.pass} placeholder="Enter password" onChange={editinputHandler} id="pwd" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
