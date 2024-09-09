const faqs = [
  {
    id: 1,
    question: "How do I sign up for the service?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate saepe veritatis accusantium fugit earum cupiditate adipisci doloribus modi quidem aliquam?",
  },
  {
    id: 2,
    question: "Can I cancel or change appointments once they're scheduled?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate saepe veritatis accusantium fugit earum cupiditate adipisci doloribus modi quidem aliquam?",
  },
  {
    id: 3,
    question: "Is my data secure and protected?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate saepe veritatis accusantium fugit earum cupiditate adipisci doloribus modi quidem aliquam?",
  },
  {
    id: 4,
    question: "Can I access the software from multiple devices?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate saepe veritatis accusantium fugit earum cupiditate adipisci doloribus modi quidem aliquam?",
  },
  {
    id: 5,
    question: "What happens if I exceed my appointment limit?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate saepe veritatis accusantium fugit earum cupiditate adipisci doloribus modi quidem aliquam?",
  },
  {
    id: 6,
    question: "Do you offer technical support for any issues I may encounter?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate saepe veritatis accusantium fugit earum cupiditate adipisci doloribus modi quidem aliquam?",
  },
  // More questions...
]

export const Faqs = () =>
{
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Have a different question and can’t find the answer you’re looking for? Reach out to our support team by{ ' ' }
            <a href="#" className="font-semibold text-primary-300 hover:text-primary-500">
              sending us an email
            </a>{ ' ' }
            and we’ll get back to you as soon as we can.
          </p>
        </div>
        <div className="mt-20">
          <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10">
            { faqs.map((faq) => (
              <div key={ faq.id }>
                <dt className="text-base font-semibold leading-7 text-gray-900">{ faq.question }</dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{ faq.answer }</dd>
              </div>
            )) }
          </dl>
        </div>
      </div>
    </div>
  )
}
