$(function() {
    if ($("#morris-chart-area").length > 0) {
        Morris.Area({
            // ID of the element in which to draw the chart.
            element: 'morris-chart-area',
            // Chart data records -- each entry in this array corresponds to a point on the chart.
            data: [{
                d: '2011-5-01',
                balance: 1020
            }, {
                d: '2011-6-02',
                balance: 3000
            }, {
                d: '2011-7-03',
                balance: 5470
            }, {
                d: '2011-8-04',
                balance: 7000
            }, {
                d: '2011-9-05',
                balance: 7920
            }, {
                d: '2011-10-06',
                balance: 12990
            }, {
                d: '2011-11-07',
                balance: 15000
            }, {
                d: '2011-12-08',
                balance: 16820
            }, {
                d: '2012-1-09',
                balance: 15592
            }, {
                d: '2012-2-10',
                balance: 14250
            }, {
                d: '2012-3-11',
                balance: 18999
            }, {
                d: '2012-4-12',
                balance: 19000
            }, {
                d: '2012-5-13',
                balance: 20778
            }, {
                d: '2012-6-14',
                balance: 23001
            }, {
                d: '2012-7-15',
                balance: 30001
            }, {
                d: '2012-8-16',
                balance: 34500
            }, {
                d: '2012-9-17',
                balance: 40987
            }, {
                d: '2012-10-18',
                balance: 38908
            }, {
                d: '2012-11-19',
                balance: 39000
            }, {
                d: '2012-12-20',
                balance: 39125
            }, {
                d: '2013-1-21',
                balance: 50200
            }, {
                d: '2013-2-22',
                balance: 56002
            }, {
                d: '2013-3-23',
                balance: 60888
            }, {
                d: '2013-4-24',
                balance: 70897
            }, {
                d: '2013-5-25',
                balance: 79330
            }, {
                d: '2013-6-26',
                balance: 80993
            }, {
                d: '2013-7-27',
                balance: 84000
            }, {
                d: '2013-8-28',
                balance: 82098
            }, {
                d: '2013-9-29',
                balance: 86044
            }, {
                d: '2013-10-30',
                balance: 89000
            }, {
                d: '2013-11-31',
                balance: 89925
            }],

            // The name of the data record attribute that contains x-balances.
            xkey: 'd',
            // A list of names of data record attributes that contain y-balances.
            ykeys: ['balance'],
            // Labels for the ykeys -- will be displayed when you hover over the chart.
            labels: ['Balance ($)'],
            // Disables line smoothing
            smooth: false
        });
    }
});
