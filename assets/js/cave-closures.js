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
      var banner = document.getElementById('cave-closure-banner');
      var caveKeys = banner && banner.dataset.caveKeys ? JSON.parse(banner.dataset.caveKeys) : null;
      var hasClosedCaves = false;
      closures.forEach(function (closure) {
        if (!isClosed(closure.start, closure.end, today)) {
          return;
        }
        if (!caveKeys || caveKeys.indexOf(closure.key) !== -1) {
          hasClosedCaves = true;
        }
        document
          .querySelectorAll('.cave-closed-status[data-cave-key="' + closure.key + '"]')
          .forEach(function (el) {
            el.hidden = false;
            var card = el.closest('.column_attr');
            if (card) {
              card.style.borderColor = '#CB0000';
            }
          });
      });
      if (banner && hasClosedCaves) {
        banner.hidden = false;
      }
    })
    .catch(function (err) {
      console.error('Unable to load cave closures:', err);
    });
})();
