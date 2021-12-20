import { CircularProgress } from "@material-ui/core"
function Loading() {
    return (
        <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
            <div style={{width:"200px"}}>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2042px-WhatsApp.svg.png"
                    alt="logo"
                    style={{ marginBottom: 8}}
                    height={200}
                    width={200}
                />
                <CircularProgress
                    style={{ 'color': '#3CBC28',width:"60px",height:"60px" }}
                />
            </div>
        </center>
    )
}

export default Loading