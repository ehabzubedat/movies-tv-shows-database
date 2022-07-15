$(function () {
    // Form submit return false in order to prevent page reload
    $('form').on('submit', () => {
        return false;
    });

    // Function that trigger's search on pressing enter
    $('#movie').on('keypress', (e) => {
        if (e.keyCode == 13) {
            $('#search_btn').trigger('click');
        }
    });

    // search button on click function
    $('#search_btn').on('click', (e) => {
        if ($('#movie').val() != '') {
            e.preventDefault();
            $('#table-body').empty();
            $('#table').removeClass('d-none');
            $.ajax({
                url: 'https://www.omdbapi.com',
                async: false,
                data: {
                    apikey: 'f9a3a6b5',
                    s: $('#movie').val()
                },
                success: function (res) {
                    if(res.Response == "False") {
                        swal('Error!', 'Movie or TV Show not found!', 'error');
                        $('#table').addClass('d-none');
                        return;
                    }
                    for (let i = 0; i < res.Search.length; i++) {
                        let content = `<tr>
                                        <th scope="row">${i+1}</th>
                                        <td>${res.Search[i].Title}</td>
                                        <td>${res.Search[i].Year}</td>
                                        <td><img src="${res.Search[i].Poster}" class="img-fluid" alt="Responsive image"></td>
                                    </tr>`;
                        $('#table-body').append(content);
                    }
                }
            });
            $('#movie').val('');
        } else {
            swal('Error!', 'Please fill in Movie or TV Show name!', 'error');
        }
    });
});
