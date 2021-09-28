export default function MangelReminder({ mangelList }) {
  const listSize = mangelList.length

  return (
    <div>
      {listSize === 1
        ? `🔔️ ${mangelList.length} fälliger Mangel 🔔️`
        : listSize > 1
        ? `🔔️ ${mangelList.length} fällige Mängel 🔔️`
        : 'alles gut 👍'}
    </div>
  )
}
