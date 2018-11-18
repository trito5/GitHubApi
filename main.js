$(function () {
            $('#getButton').on('click', function (e) {
                e.preventDefault();
                $('#apiData').html('<div id="loader"><img src="Giphy.gif" alt="loading..."></div>');

                var username = $('#username').val();
                var requri = 'https://api.github.com/users/' + username;
                var repouri = 'https://api.github.com/users/' + username + '/repos';


                requestJSON(requri, function (json) {
                    // if user is not found
                    if (json.message == "Not Found" || username == '') {
                       $('#apiData').html('<h5 class="card-titl"e>User not found!</h2>');
                        
                    } else {
                        // if user is found, show the details
                        var fullname = json.name;
                        var username = json.login;
                        var aviurl = json.avatar_url;
                        var profileurl = json.html_url;
                        var location = json.location;
                        var reposnum = json.public_repos;

                        if (fullname == undefined) {
                            fullname = username;
                        }

                        var outhtml = '<h5 class = "card-title">' + fullname + ' <span class="smallname">(<a href="' + profileurl + '" target="_blank">' + username + '</a>)</span></h2>';
                        outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="' + profileurl + '" target="_blank"><img src="' + aviurl + '" class="img-thumbnail" width="100" height="100" alt="' + username + '"></a></div>';
                        outhtml = outhtml + '<br>Repos: ' + reposnum + '</p></div>';
                        outhtml = outhtml + '<div class="repolist clearfix">';

                        var repositories;
                        $.getJSON(repouri, function (json) {
                            repositories = json;
                            outputPageContent();
                        });

                        function outputPageContent() {
                            if (repositories.length == 0) {
                                outhtml = outhtml + '<p>No repos!</p></div>';
                            } else {
                                outhtml = outhtml + '<p><strong>Repos List:</strong></p> <ul>';
                                $.each(repositories, function (index) {
                                    outhtml = outhtml + '<li><a href="' + repositories[index].html_url + '" target="_blank">' + repositories[index].name + '</a></li>';
                                });
                                outhtml = outhtml + '</ul></div>';
                            }
                            $('#apiData').html(outhtml);
                        } // end outputPageContent()
                    } // end else statement
                }); // end requestJSON Ajax call
            }); // end click event handler

        });

            function requestJSON(url, callback) {
                $.ajax({
                    url: url,
                    complete: function (xhr) {
                        callback.call(null, xhr.responseJSON);
                    }
                });
            }