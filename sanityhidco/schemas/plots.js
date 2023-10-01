export default {
  name: 'plots',
  type: 'document',
  title: 'Plots',
  fields: [
    {
      name: 'plot_num',
      type: 'string',
      title: 'Plots Number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'premises_num',
      type: 'string',
      title: 'Premises Number',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'alloted_to',
      type: 'string',
      title: 'Alloted To',
      validation: (Rule) => Rule.required(),
    },
    // {
    //   name: 'package',
    //   type: 'array',
    //   title: `Package`,
    //   of: [{type: 'reference', to: [{type: 'package'}]}],
    // },
    // {
    //   name: 'service',
    //   type: 'array',
    //   title: `Service`,
    //   of: [{type: 'reference', to: [{type: 'service'}]}],
    // },
    // {
    //   name: 'type',
    //   type: 'reference',
    //   title: 'Categories',
    //   validation: (Rule) => Rule.required(),
    //   to: [{type: 'categories'}],
    // },
    //   {
    //     name: 'dishes',
    //     type: 'array',
    //     title: 'Dishes',
    //     validation: (Rule) => Rule.required(),
    //     of: [{type: 'reference', to: [{type: 'dishes'}]}],
    //   },
  ],
}
