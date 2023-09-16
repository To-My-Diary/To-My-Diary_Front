import bootstrap from 'bootstrap';

function Modal()
{
    return (
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">시간 설정</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input type="number" min={"0"} max={"23"}></input>&nbsp;:&nbsp;<input type="number" min={"0"} max={"59"}></input>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                <button type="button" class="btn btn-primary">저장</button>
            </div>
        </div>
    </div>
    </div>
    )
}

export default Modal;