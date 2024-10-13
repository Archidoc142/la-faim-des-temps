import StarComment from "./StarComment"

export default function StarsComment({note, setData = null, updatable = true}) {
    return (
        <div className={"flex gap-2" + (!updatable ? " !gap-[4px]" : "")}>
            <StarComment note={note} newNote={1} setData={setData} updatable={updatable}/>
            <StarComment note={note} newNote={2} setData={setData} updatable={updatable}/>
            <StarComment note={note} newNote={3} setData={setData} updatable={updatable}/>
            <StarComment note={note} newNote={4} setData={setData} updatable={updatable}/>
            <StarComment note={note} newNote={5} setData={setData} updatable={updatable}/>
        </div>
    )
}
