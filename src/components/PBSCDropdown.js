import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

import { COLOR } from '../helpers/Colors';

const PBSCDropdown = (props) => {
  const {
    id,
    label,
    value = undefined,
    items,
    textAlignInItem = 'left',
    onSelect = () => {},
    helperText,
    showValueWhenSelected = false,
    disabled = false,
    width = '80%',
    height = 48,
    backgroundColor = COLOR.WHITE,
    borderColor = COLOR.GRAY_LIGHT,
    textColor = COLOR.BLACK,
    textSize = 16,
    style,
    fieldStyle,
    helperTextStyle,
    hasHelperTextIcon = false,
    helperTextCustomIcon, // any svg icon component to show before helper text or error text goes here
  } = props;
  const windowHeight = Dimensions.get('window').height;

  const DropdownPressible = useRef();
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const [dropdownHeight, setDropdownHeight] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(value);

  const toggleDropdown = () => {
    isOpen ? setIsOpen(false) : openDropdown();
  };

  const openDropdown = () => {
    const marginVertical = 36;
    DropdownPressible.current.measureInWindow((x, y, w, h) => {
      const dropdownBottom = y + h;
      if (windowHeight - dropdownBottom > 2 * height + marginVertical) {
        const desiredHeight =
          windowHeight - dropdownBottom - marginVertical > items.length * height
            ? items.length * height
            : windowHeight - dropdownBottom - marginVertical;
        setDropdownTop(y + h);
        setDropdownLeft(x);
        setDropdownWidth(w);
        setDropdownHeight(desiredHeight);
      } else {
        const desiredHeight =
          y - marginVertical > items.length * height
            ? items.length * height
            : y - marginVertical;
        setDropdownTop(y - desiredHeight);
        setDropdownLeft(x);
        setDropdownWidth(w);
        setDropdownHeight(desiredHeight);
      }
    });
    setIsOpen(true);
  };

  const onItemPress = (item) => {
    setSelectedItem(item);
    if (typeof onSelect === 'function') {
      onSelect(item);
    }
    setIsOpen(false);
  };

  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? COLOR.GRAY_PALE : COLOR.WHITE,
            height: height,
            padding: 10,
          },
        ]}
        onPress={() => onItemPress(item)}
      >
        <Text
          testID={`dropdown-item-${index}`}
          numberOfLines={2}
          adjustsFontSizeToFit
          style={{ fontSize: textSize }}
        >
          {item.label}
        </Text>
      </Pressable>
    );
  };

  const renderDropdown = () => {
    return (
      <Modal
        testID="dropdown-modal"
        visible={isOpen}
        transparent
        animationType="none"
      >
        <Pressable style={styles.overlay} onPress={toggleDropdown}>
          <View
            style={[
              styles.dropdown,
              {
                top: dropdownTop,
                left: dropdownLeft,
                width: dropdownWidth,
                height: dropdownHeight,
              },
            ]}
          >
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Pressable>
      </Modal>
    );
  };

  return (
    <View style={{ width: width, marginTop: 10, ...style }}>
      <Pressable
        disabled={disabled}
        ref={DropdownPressible}
        onPress={toggleDropdown}
      >
        {renderDropdown()}
        <View pointerEvents="none">
          <TextInput
            testID="dropdown-input"
            mode="outlined"
            id={id}
            label={label}
            value={
              selectedItem &&
              (showValueWhenSelected ? selectedItem.value : selectedItem.label)
            }
            disabled={disabled}
            editable={false}
            outlineColor={borderColor}
            selection={{ start: 0 }}
            right={
              <TextInput.Icon
                name="chevron-down"
                color={disabled ? COLOR.GRAY_LIGHT : COLOR.BLACK}
                disabled
                style={{ paddingTop: 10 }}
              />
            }
            style={{
              height: height,
              backgroundColor: backgroundColor,
              fontSize: textSize,
              ...fieldStyle,
            }}
            theme={{
              colors: { text: disabled ? COLOR.GRAY_MEDIUM : textColor },
            }}
          />
        </View>
      </Pressable>
      <View style={{ flexDirection: 'row' }}>
        {hasHelperTextIcon && helperTextCustomIcon}
        <HelperText
          testID="dropdown-helpertext"
          type="info"
          visible={helperText}
          style={{ marginStart: -10, ...helperTextStyle }}
        >
          {helperText}
        </HelperText>
      </View>
    </View>
  );
};

export default PBSCDropdown;

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    elevation: 4,
    shadowOpacity: 0.5,
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
});
