import hidco_allotments from '../hidco_allotments.json'

export default {
  name: 'hidcoplots',
  type: 'document',
  title: 'Hidco Plots',
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
  ],
}
