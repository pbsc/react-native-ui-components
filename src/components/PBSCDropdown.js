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
    data,
    onSelect,
    helperText,
    disabled = false,
    width = '80%',
    height = 48,
    backgroundColor = COLOR.WHITE,
    borderColor = COLOR.GRAY_LIGHT,
    style,
    fieldStyle,
    helperTextStyle,
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
          windowHeight - dropdownBottom - marginVertical > data.length * height
            ? data.length * height
            : windowHeight - dropdownBottom - marginVertical;
        setDropdownTop(y + h);
        setDropdownLeft(x);
        setDropdownWidth(w);
        setDropdownHeight(desiredHeight);
      } else {
        const desiredHeight =
          y - marginVertical > data.length * height
            ? data.length * height
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
    onSelect(item);
    setIsOpen(false);
  };

  const renderItem = ({ item }) => (
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
      <Text numberOfLines={2} adjustsFontSizeToFit style={{ fontSize: 16 }}>
        {item.label}
      </Text>
    </Pressable>
  );

  const renderDropdown = () => {
    return (
      <Modal visible={isOpen} transparent animationType="none">
        <Pressable style={styles.overlay} onPress={() => setIsOpen(false)}>
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
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Pressable>
      </Modal>
    );
  };

  return (
    <View style={{ width: width, ...style }}>
      <Pressable
        disabled={disabled}
        ref={DropdownPressible}
        onPress={toggleDropdown}
      >
        {renderDropdown()}
        <TextInput
          onTouchEnd={toggleDropdown}
          mode="outlined"
          id={id}
          label={label}
          value={selectedItem && selectedItem.label}
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
            ...fieldStyle,
          }}
          theme={{
            colors: { text: disabled ? COLOR.GRAY_MEDIUM : COLOR.BLACK },
          }}
        />
      </Pressable>
      <HelperText
        type="info"
        visible={helperText}
        style={{ marginStart: -14, ...helperTextStyle }}
      >
        {helperText}
      </HelperText>
    </View>
  );
};

export default PBSCDropdown;

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    zIndex: 1,
  },
  fieldText: {
    flex: 1,
    textAlign: 'left',
    fontSize: 16,
    paddingStart: 4,
  },
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
