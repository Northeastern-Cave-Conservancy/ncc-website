(function () {
  var TIME_ZONE = 'America/New_York';

  function todayMMDD() {
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: TIME_ZONE,
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(new Date());
    var month = parts.find(function (p) { return p.type === 'month'; }).value;
    var day = parts.find(function (p) { return p.type === 'day'; }).value;
    return month + '-' + day;
  }

  // Dates are zero-padded MM-DD strings, so string comparison orders them correctly.
  function isClosed(start, end, today) {
    if (start <= end) {
      return today >= start && today <= end;
    }
    // Range wraps the year end, e.g. 10-01 to 04-30.
    return today >= start || today <= end;
  }

  fetch('/assets/data/cave_closures.json')
    .then(function (response) { return response.json(); })
    .then(function (closures) {
      var today = todayMMDD();
      var closedNames = [];
      closures.forEach(function (closure) {
        if (!isClosed(closure.start, closure.end, today)) {
          return;
        }
        document
          .querySelectorAll('.cave-closed-status[data-cave-key="' + closure.key + '"]')
          .forEach(function (el) {
            el.hidden = false;
            closedNames.push(el.dataset.caveTitle);
            var card = el.closest('.column_attr');
            if (card) {
              card.style.borderColor = '#B00020';
            }
          });
      });
      if (closedNames.length) {
        var banner = document.getElementById('cave-closure-banner');
        banner.textContent = 'Winter closures are in effect. The following caves are currently closed:\n' + closedNames.join(', ') + '.';
        banner.hidden = false;
      }
    })
    .catch(function (err) {
      console.error('Unable to load cave closures:', err);
    });
})();
