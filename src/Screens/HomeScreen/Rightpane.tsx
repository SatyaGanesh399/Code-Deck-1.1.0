import React, { useContext } from "react";
import styled from "styled-components";
import { BsTrashFill } from "react-icons/bs";
import { AiTwotoneEdit } from "react-icons/ai";
import { ModalContext } from "../../ModalContext/ModalContext";
import { PlaygroundContext } from "../../ModalContext/PlaygroundContext";
import { useNavigate } from "react-router-dom";


interface HeaderProps {
  readonly variant: string;
}
interface headingSize {
  readonly size: string;
}
const StyledRightPane = styled.div`
  width: 60%;
  height: 100vh;
  padding: 2rem;
  background: #fafafa;
  position: absolute;
  right: 0;
  top: 0;
`;

const Header = styled.div<HeaderProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin-bottom: ${(props) => (props.variant === "primary" ? "2rem" : "1rem")};

  &::after {
    position: absolute;
    content: "";
    bottom: -1.25rem;
    width: 100%;
    height: 2px;
    background: rgba(0, 0, 0, 0.25);
    display: ${(props) => (props.variant === "primary" ? "block" : "none")};
  }
`;
const Heading = styled.h3<headingSize>`
  font-weight: 400;
  font-size: ${(props) => (props.size === "main" ? "1.8rem" : "1.5rem")};

  span {
    font-weight: 700;
  }
`;

const AddButton = styled.button`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background: transparent;
  outline: 0;
  border: 0;
  font-size: 1.1rem;
  cursor: pointer;
  span {
    font-weight: 700;
  }
  transition: all 0.25s ease;
  &:hover {
    opacity: 0.75;
  }
`;

const Folder = styled.div`
  margin-bottom: 0.5rem;
  margin-bottom: 2rem;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
  row-gap: 1rem;
`;

const PlaygroundCard = styled.div`
  display: flex;
  align-items: center;
  padding: 0.6rem;
  gap: 2rem;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
  cursor : pointer;
  transition : all 0.1s ease

  &:hover{
    opacity : 0.75
  }
`;

const SmallImage = styled.img`
  width: 75px;
`;
const CardContent = styled.div`
  flex-grow: 1;
  margin-left: -20px;

  h5 {
    font-weight: 400;
    font-size: 1 rem;
    margin-bottom: 0.5rem;
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1 rem;
  padding-right: 1rem;
`;

const FolderButtons = styled.div`
  display: flex;
  algn-items: center;
  justify-content: flex-end;
`;

const RightPane = () => {
  const makeAvailableGlobally = useContext(ModalContext)!;
  const { openModal } = makeAvailableGlobally;

  const PlaygroundFeatures = React.useContext(PlaygroundContext)!;
  const Folders = PlaygroundFeatures.folders;
  const { deleteCard, deleteFolder } = PlaygroundFeatures;

  const navigate = useNavigate();

  return (
    <StyledRightPane>
      <Header variant="primary">
        <Heading size="main">
          My <span>playgrounds</span>
        </Heading>
        <AddButton
          onClick={() => {
            openModal({
              value: true,
              type: "4",
              identifier: {
                folderId: "",
                cardId: "",
              },
            });
          }}
        >
          {" "}
          + New Folder
        </AddButton>
        {/* <DarkMode /> */}
      </Header>

      {Object.entries(Folders).map(
        ([folderId, folder]: [foldersId: string, folder: any]) => (
          <Folder key={folderId}>
            <Header variant="secondary">
              <Heading size="secondary">{folder.title}</Heading>
              <FolderButtons>
                <Icons>
                  <BsTrashFill
                    onClick={() => {
                      // Delete folder
                      deleteFolder(folderId);
                    }}
                  />
                  <AiTwotoneEdit
                    onClick={() => {
                      openModal({
                        value: true,
                        type: "2",
                        identifier: {
                          folderId: folderId,
                          cardId: "",
                        },
                      });
                    }}
                  />
                </Icons>
              
              <AddButton
                onClick={() => {
                  openModal({
                    value: true,
                    type: "3",
                    identifier: {
                      folderId: folderId,
                      cardId: "",
                    },
                  });
                }}
              >
                <span>+</span> New Playground
              </AddButton>
              </FolderButtons>
            </Header>

            <CardContainer>
              {Object.entries(folder.items).map(
                ([cardId, card]: [cardId: string, card: any]) => (
                  <PlaygroundCard>
                    <SmallImage src="./logo-small.png" alt="" />
                    <CardContent
                      onClick={() => {
                        navigate(`/code/${folderId}/${cardId}`);
                      }}
                    >
                      <h5>{card.title}</h5>
                      <p>Language : {card.languages}</p>
                    </CardContent>
                    <Icons
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <BsTrashFill
                        onClick={() => {
                          deleteCard(folderId, cardId);
                        }}
                      />
                      <AiTwotoneEdit
                        onClick={() => {
                          openModal({
                            value: true,
                            type: "1",
                            identifier: {
                              folderId: folderId,
                              cardId: cardId,
                            },
                          });
                        }}
                      />
                    </Icons>
                  </PlaygroundCard>
                )
              )}
            </CardContainer>
          </Folder>
        )
      )}
    </StyledRightPane>
  );
};

export default RightPane;
