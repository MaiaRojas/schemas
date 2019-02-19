module.exports = (conn) => {
  const ReviewQuestionSchema = new conn.Schema({
    slug: { type: String, required: true },
    type: { type: String, enum: ['open', 'multiple-choice'], require: true },
    options: { type: Number },
  });


  ReviewQuestionSchema.pre('validate', function (next) {
    if (this.type === 'multiple-choice' && !this.options) {
      return next(new Error('Options is required when type is multiple-choice'));
    }
    return next();
  });


  const ReviewerSurveySchema = new conn.Schema({
    questions: [ReviewQuestionSchema],
  });

  return ReviewerSurveySchema;
};