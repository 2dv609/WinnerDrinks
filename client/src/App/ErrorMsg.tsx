/**
* A component that renders an error message on the start screen.
*
* @author Susanna Persson
* @author Delfi Sehidic
*/

function ErrorMsg(props: any) {
  if (props.message) {
    return (
      <div>
        <div className="modal is-active">
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Whoopsie</p>
              <button className="delete" onClick={() => props.setError(null)} aria-label="close" />
            </header>
            <section className="modal-card-body">
              <div className="content">
                {props.message}
              </div>
              <button className="button is-success" onClick={() => props.setError(null)}>Oh, okay!</button>
            </section>

          </div>
        </div>
      </div>
    );
  } else {
    return (
      <span style={{ display: 'none' }} />
    )
  }
}

export default ErrorMsg;
