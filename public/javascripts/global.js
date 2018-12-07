var userListData = []
$(document).ready(function() {
    populateTable();
    $("#userList table tbody").on("click","td a.linkshowuser", showUserInfo);
    $('#btnAddUser').on('click',addUser);
    $('#btnUpdateUser').on('click',updateUser);
    $('#userList table tbody').on('click','td a.linkdeleteuser', deleteUser);
});

function populateTable() {
    var tableContent = '';
    $.getJSON('/users/userlist',function(data) {
        userListData = data;
        $.each(data,function() {
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this._id + '">'+this.username+'</a></td>';
            tableContent += '<td>'+this.email+'</td>' ;
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });
        $('#userList table tbody').html(tableContent);
    });
};

function showUserInfo(event) {
    event.preventDefault();
    var thisId = $(this).attr('rel');
    var arrayPosition = userListData.map(function(arrayItem) {
        return arrayItem._id;
    } ).indexOf(thisId);    

    var thisUserObject = userListData[arrayPosition];

    
    $("#userInfoName").text(thisUserObject.fullname);
    $("#userInfoAge").text(thisUserObject.age);
    $("#userInfoGender").text(thisUserObject.gender);
    $("#userInfoLocation").text(thisUserObject.location);

    $('#addUser fieldset input#inputUserId').val(thisUserObject._id);
    $('#addUser fieldset input#inputUserName').val(thisUserObject.username);
    $('#addUser fieldset input#inputUserEmail').val(thisUserObject.email);
    $('#addUser fieldset input#inputUserFullname').val(thisUserObject.fullname);
    $('#addUser fieldset input#inputUserAge').val(thisUserObject.age);
    $('#addUser fieldset input#inputUserLocation').val(thisUserObject.location);
    $('#addUser fieldset input#inputUserGender').val(thisUserObject.gender);

}

function addUser(event) {
    event.preventDefault();

    var errorCount = 0;
    $('#addUser input').each( function(index,val) {
        if ($(this).val() === '') {errorCount++;}
    });

    if (errorCount === 0 ) {
        var newUser = {
            'username':$('#addUser fieldset input#inputUserName').val(),
            'email':$('#addUser fieldset input#inputUserEmail').val(),
            'fullname':$('#addUser fieldset input#inputUserFullname').val(),
            'age':$('#addUser fieldset input#inputUserAge').val(),
            'location':$('#addUser fieldset input#inputUserLocation').val(),
            'gender':$('#addUser fieldset input#inputUserGender').val(),
        } ;

        $.ajax({
            type:'POST',
            data:newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function(response) {
            if (response.msg === '') {
                $('#addUser fieldset input').val('');
                populateTable();
            }
            else {
                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        alert('Please fill in all fields');
        return false;
    }
};

function updateUser(event) {
    event.preventDefault();
    var errorCount = 0;
    $('#addUser input').each( function(index,val) {
        if ($(this).val() === '') {errorCount++;}
    });

    if (errorCount === 0 ) {
        var newUser = {
            '_id':$('#addUser fieldset input#inputUserId').val(),
            'username':$('#addUser fieldset input#inputUserName').val(),
            'email':$('#addUser fieldset input#inputUserEmail').val(),
            'fullname':$('#addUser fieldset input#inputUserFullname').val(),
            'age':$('#addUser fieldset input#inputUserAge').val(),
            'location':$('#addUser fieldset input#inputUserLocation').val(),
            'gender':$('#addUser fieldset input#inputUserGender').val(),
        } ;

        $.ajax ( {
            type:'PUT',
            url:'/users/updateuser/',
            data:newUser,
            dataType:'JSON'
        }).done(function(response) {
            if (response.msg === '') {
                $('#addUser fieldset input').val('');
                populateTable();
            }
            else {
                alert('Error: ' + response.msg);
            }
        });
    }
}


function deleteUser(event) {
    event.preventDefault();

    var confirmation = confirm('Are you sure you want to delte this user?');

    if (confirmation === true) {
        $.ajax( {
            type:'DELETE',
            url:'/users/deleteuser/' + $(this).attr('rel')
        }).done(function(response) {
            if (response.msg === ''  ) {

            }
            else {
                alert('Error:' + response.msg);
            }
            populateTable();
        });
    }
    else {
        return false;
    }
}
