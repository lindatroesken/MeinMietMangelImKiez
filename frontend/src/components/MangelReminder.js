import Message from './Message'

export default function MangelReminder({ mangelList }) {
  const listSize = mangelList.length

  return (
    <Message>
      {listSize === 1
        ? `${mangelList.length} fälliger Mangel`
        : listSize > 1
        ? `${mangelList.length} fällige Mängel️`
        : 'alles gut 👍'}
    </Message>
  )
}
