import React, { FC } from 'react';
import {
  Button,
  Text,
  Box,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react';
import { MdLabelOutline } from 'react-icons/md';
import { updateCard } from '@/src/slices/cards';
import { useDispatch } from 'react-redux';
import { Label } from '@/src/types/cards';

type IProps = {
  id: string;
  boardId: string;
};

const cardLabels = [
  {
    type: 'performance',
    bg: '#0079bf'
  },
  {
    type: 'bug',
    bg: '#eb5a46'
  },
  {
    type: 'feature',
    bg: '#61bd4f'
  },
  {
    type: 'information',
    bg: '#ff9f1a'
  },
  {
    type: 'warning',
    bg: '#f2d600'
  }
];

const CardLabel: FC<IProps> = ({ id, boardId }) => {
  const dispatch = useDispatch();

  const handleClick = async (label: Label) => {
    const data = {
      _id: id,
      boardId,
      label
    };

    await dispatch(updateCard(data));
  };

  return (
    <Box marginTop="2rem" flexDirection="column" width="20%">
      <Text as="samp" whiteSpace="nowrap">
        ADD TO CARD
      </Text>
      <List spacing={3} p="5px">
        <ListItem>
          <Menu size="xs">
            <MenuButton leftIcon={<MdLabelOutline />} size="xs" whiteSpace="nowrap" as={Button}>
              Labels
            </MenuButton>
            <MenuList padding="5px">
              {cardLabels.map((item, index) => (
                <MenuItem
                  bg={item.bg}
                  marginBottom="5px"
                  key={index}
                  onClick={() => handleClick(item)}>
                  <Box minH="20px"></Box>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </ListItem>
      </List>
    </Box>
  );
};

export default CardLabel;
