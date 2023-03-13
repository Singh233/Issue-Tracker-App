const queue = require('../config/kue');

const resetPasswordMailer = require('../mailers/reset-password-mailer');

queue.process('emails', function(job, done) {
    console.log('Emails worker is processing a job', job.data);

    resetPasswordMailer.sendEmail(job.data.email, "Password reset link", job.data.link);

    done();
})