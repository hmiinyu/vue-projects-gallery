import '@babel/polyfill';
import { mapState as _mapState, mapGetters as _mapGetters, mapMutations as _mapMutations, mapActions as _mapActions } from 'vuex';
import { DataType } from '../m2-core';

const _checkMapItem = (item) => {
  return /^\w+(:\w+)?(\/\w+)?(:\w+)?$/.test(item);
};

const _mapModuleResult = (item, map, state) => {
  const array = item.split('/');
  const modules = array[0].split(':');
  const values = array[1].split(':');
  const moduleName = modules[0];
  const moduleAlias = modules.length === 1 ? modules[0] : modules[1];
  const alias = values.length === 1 ? values[0] : values[1];
  const value = values[0];

  return {
    [`${moduleAlias}_${alias}`]: (
      state ? {
        get() { return this.$store.state[moduleName][value]},
        set() {}
      } : map([`${moduleName}/${value}`])[`${moduleName}/${value}`]
    )
  };
};

const _mapInnerResult = (item, map, owner = null) => {
  let result = {};
  const array = item.split(':');
  if (array.length === 1) {
    result = { ...result, ...(owner ? map(item) : map([item])) };
  } else if (array.length === 2) {
    const state = array[0];
    const alias = array[1];
    result[alias] = owner ? map(owner)[item] : map([state])[state];
  }
  return result;
};

const _mapResult = (keys, map, state = false) => {
  let result = {};

  if (DataType.isArray(keys)) {
    keys.forEach(item => {
      if (DataType.isString(item) && _checkMapItem(item)) {
        if (item.includes('/')) {
          result = { ...result, ..._mapModuleResult(item, map, state) };
        } else {
          result = { ...result, ..._mapInnerResult(item, map) };
        }
      } else if (DataType.isObject(item)) {
        for (const prop in item) {
          result = { ...result, ..._mapInnerResult(prop, map, item) };
        }
      }
    });
  }

  return result;
};

export const mapState = (stateKeys) => {
  return _mapResult(stateKeys, _mapState, true);
};

export const mapGetters = (getterKeys) => {
  return _mapResult(getterKeys, _mapGetters);
};

export const mapMutations = (mutationKeys) => {
  return _mapResult(mutationKeys, _mapMutations);
};

export const mapActions = (actionKeys) => {
  return _mapResult(actionKeys, _mapActions);
};
