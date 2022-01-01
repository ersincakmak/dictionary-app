import styled from 'styled-components'

const Modal = styled.div<{}>`
  position: absolute;
  width: min(37.5rem, 90%); // 600px
  background-color: ${(props) => props.theme.colors.bg};
  border-radius: 5px;
  border: 2px solid ${(props) => props.theme.colors.text};
  max-height: calc(100% - 8rem);
  height: max-content;
  overflow: auto;
  left: 50%;
  transform: translateX(-50%);

  .closeModal {
    padding: 0.2em;
    width: max-content;
    height: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg {
      font-size: 1.75rem; // 28px
    }
  }
`

export default Modal
