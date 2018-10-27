login = () => {
    //Post data to Express backend point
    //Must fetch data via client's IP because 'localhost' will not work
    fetch('http://172.31.101.220:3000/users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application.json',
        },
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            })
    })

    .then((response) => response.json())
    .then((res) => {

        //If the response is true as set in Express route /users
        if (res.success === true) {
            let username = res.message;
            
            //Use Asyncstorage to store the users username 
            AsyncStorage.setItem('username', username);

            //Redirect to memberarea
            this.props.navigator.push({
                id: 'Memberarea'
            });

            //Show error message if login didn't succeed
        } else {
            alert(res.message);
        }    
     
    }
    .done();
