var len;
var results = '';

function apiSearch() {
  var params = {
    "q": $("#query").val(),
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
  };

  $.ajax({
      url: 'https://api.bing.microsoft.com//v7.0/search?' + $.param(params),
      beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "96d1a42c6ac148ce847238a81b6c04c1");
      },
      type: "GET",
    })
    .done(function (data) {
      len = data.webPages.value.length;
      for (i = 0; i < len; i++) {
        results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
      }

      $('#searchResults').html(results);
        $('#searchResults').dialog({
            height: 500,
            width: 600,
            modal: true,
            title: 'Search Results',
            buttons: {
                Close: function () {
                    $(this).dialog("close");
                }
            }
        });
    })
    .fail(function () {
      alert("error");
    });
}

function lucky() {
    var params = {
        "q": $("#query").val(),
        "count": "1",
        "offset": "0",
        "mkt": "en-us"
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com//v7.0/search?' + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "96d1a42c6ac148ce847238a81b6c04c1");
        },
        type: "GET",
    })
        .done(function (data) {
            window.open(data.webPages.value[0].url, '_blank');

        })
        .fail(function () {
            alert("error");
        });
}

function handleSearch() {
    toggleVisibility("searchResults");
    apiSearch();
    toggleVisibility("searchResults");
}

function changeBackground() {
    document.body.classList.toggle("background");
    document.body.classList.toggle("secondBackground");
}

function toggleVisibility(elementId) {
    let element = document.getElementById(elementId);
    element.style.visibility = (element.style.visibility === "hidden") ? "visible" : "hidden";
}

function timeSearch() {
    $(function () {
        $("#timeModal").dialog({
            autoOpen: false, // prevent the modal from opening automatically
            modal: true, 
            buttons: {
                Ok: function () {
                    $(this).dialog("close"); // close the modal 
                }
            }
        });

        function updateTime() {
            var now = new Date();
            var hours = now.getHours();
            var minutes = now.getMinutes();
            var seconds = now.getSeconds();
            var ampm = hours >= 12 ? 'PM' : 'AM';

            // convert to 12-hour format
            hours = hours % 12;
            // the hour '0' should be '12'
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            var timeString = hours + ":" + minutes + ":" + seconds + " " + ampm;
            $("#time").text(timeString); // update the time display in the modal
            $("#timeModal").dialog("open"); // open the modal
        }

        $("#showTimeButton").click(updateTime);
    });
}

function handleTime() {
    toggleVisibility("time");
    timeSearch();
    toggleVisibility("time");
}