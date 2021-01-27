/* globals $, Morris */
$(function() {

    "use strict";

    if ($("#morris-chart-area").length > 0) {
        let oneYearAgo = new Date().getFullYear() - 1,
            twoYearsAgo = oneYearAgo - 1,
            threeYearsAgo = oneYearAgo - 2;

        Morris.Area({
            // ID of the element in which to draw the chart.
            element: "morris-chart-area",
            // Chart data records -- each entry in this array corresponds to a point on the chart.
            data: [{
                d: threeYearsAgo + "-5-01",
                balance: 1020
            }, {
                d: threeYearsAgo + "-6-02",
                balance: 3000
            }, {
                d: threeYearsAgo + "-7-03",
                balance: 5470
            }, {
                d: threeYearsAgo + "-8-04",
                balance: 7000
            }, {
                d: threeYearsAgo + "-9-05",
                balance: 7920
            }, {
                d: threeYearsAgo + "-10-06",
                balance: 12990
            }, {
                d: threeYearsAgo + "-11-07",
                balance: 15000
            }, {
                d: threeYearsAgo + "-12-08",
                balance: 16820
            }, {
                d: twoYearsAgo + "-1-09",
                balance: 15592
            }, {
                d: twoYearsAgo + "-2-10",
                balance: 14250
            }, {
                d: twoYearsAgo + "-3-11",
                balance: 18999
            }, {
                d: twoYearsAgo + "-4-12",
                balance: 19000
            }, {
                d: twoYearsAgo + "-5-13",
                balance: 20778
            }, {
                d: twoYearsAgo + "-6-14",
                balance: 23001
            }, {
                d: twoYearsAgo + "-7-15",
                balance: 30001
            }, {
                d: twoYearsAgo + "-8-16",
                balance: 34500
            }, {
                d: twoYearsAgo + "-9-17",
                balance: 40987
            }, {
                d: twoYearsAgo + "-10-18",
                balance: 38908
            }, {
                d: twoYearsAgo + "-11-19",
                balance: 39000
            }, {
                d: twoYearsAgo + "-12-20",
                balance: 39125
            }, {
                d: oneYearAgo + "-1-21",
                balance: 50200
            }, {
                d: oneYearAgo + "-2-22",
                balance: 56002
            }, {
                d: oneYearAgo + "-3-23",
                balance: 60888
            }, {
                d: oneYearAgo + "-4-24",
                balance: 70897
            }, {
                d: oneYearAgo + "-5-25",
                balance: 79330
            }, {
                d: oneYearAgo + "-6-26",
                balance: 80993
            }, {
                d: oneYearAgo + "-7-27",
                balance: 84000
            }, {
                d: oneYearAgo + "-8-28",
                balance: 82098
            }, {
                d: oneYearAgo + "-9-29",
                balance: 86044
            }, {
                d: oneYearAgo + "-10-30",
                balance: 89000
            }, {
                d: oneYearAgo + "-11-31",
                balance: 89925
            }],

            // The name of the data record attribute that contains x-balances.
            xkey: "d",
            // A list of names of data record attributes that contain y-balances.
            ykeys: ["balance"],
            // Labels for the ykeys -- will be displayed when you hover over the chart.
            labels: ["Balance ($)"],
            // Disables line smoothing
            smooth: false
        });
    }
});
