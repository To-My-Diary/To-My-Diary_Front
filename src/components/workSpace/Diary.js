function Diary()
{
    return (
        <div>
            <h2>Diary</h2>
            <form onSubmit={(event)=>{
                event.preventDefault();
            }}>
                <p><input type="text" name="title" placeholder="title"/></p>
                <p><textarea name="body" placeholder="body"></textarea></p>
                <p><input type="submit" value="write"></input></p>
            </form>
        </div>
    )
}

export default Diary;