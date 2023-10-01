export default {
  name: 'areas',
  type: 'document',
  title: 'Areas',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Area Name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'plots',
      type: 'array',
      title: `Plots`,
      of: [{type: 'reference', to: [{type: 'plots'}]}],
    },
  ],
}
