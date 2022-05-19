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
import { HelperText } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import { COLOR } from '../constants/Colors';

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

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(value);

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
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
    setVisible(true);
  };

  const onItemPress = (item) => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
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
      <Modal visible={visible} transparent animationType="none">
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
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
        id={id}
        disabled={disabled}
        ref={DropdownPressible}
        style={[
          {
            height: height,
            backgroundColor,
            borderColor: disabled ? COLOR.DISABLED : borderColor,
          },
          styles.field,
          fieldStyle,
        ]}
        onPress={toggleDropdown}
      >
        {renderDropdown()}
        <Text
          style={[
            {
              color: disabled
                ? COLOR.DISABLED
                : selected
                ? COLOR.BLACK
                : COLOR.GRAY_MEDIUM,
            },
            styles.fieldText,
          ]}
          numberOfLines={1}
        >
          {(selected && selected.label) || label}
        </Text>
        <Icon
          name="chevron-down-outline"
          size={18}
          style={{ color: COLOR.GRAY_LIGHT }}
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
