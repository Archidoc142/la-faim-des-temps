import StarComment from "./StarComment"

export default function StarsComment({note, setNote}) {
    return (
        <div className="flex gap-2">
            <StarComment note={note} newNote={1} setNote={setNote}/>
            <StarComment note={note} newNote={2} setNote={setNote}/>
            <StarComment note={note} newNote={3} setNote={setNote}/>
            <StarComment note={note} newNote={4} setNote={setNote}/>
            <StarComment note={note} newNote={5} setNote={setNote}/>
        </div>
    )
}
