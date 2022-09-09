<template>
    <div class="v-list">
        <div class="item" v-for="item in items" :key="item.key">
            <slot name="item" :item="item" />
        </div>
    </div>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import { Prop } from "vue-property-decorator";
    import Vue, { PropType } from "vue";

    interface IListItem {
        key: string | number;
    }

    @Component
    export default class extends Vue {
        @Prop({ required: true, type: Array as PropType<IListItem[]> })
        protected readonly items!: IListItem[];
    }
</script>

<style scoped>
    .v-list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .item {
        display: flex;
        justify-content: center;
        width: 100%;
    }
</style>
