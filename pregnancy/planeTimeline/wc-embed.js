/*global WizardClocks, createTimeline */
WizardClocks.clocks["special-events/pregnancy-clock"] = {
    id:   "special-events/pregnancy-clock",
    name: "Pregnancy Clock",
    params: {
        due_date: {
            name: "due_date",
            type: "date",
            defaultValue: "July 27, 2011"
        }
    },
    embedCode: [
        {src: "special-events/pregnancy-clock/pregnancyTimeline.js"}
    ],

    embedClock: function (div, params) {
        createTimeline(params.due_date, div);
    }
};
  